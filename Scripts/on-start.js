 var evaluatedThings = {}
                       
 function nextId(){
  return "id:"+Math.random();
 }
 
 function simplify(val){
  if(!val) return val;
  
  if(val.GetDisplayName){
   return {type: "actor", id: val.GetDisplayName()}
  }
  
  if(val.map){
   return val.map(simplify)
  }
  
  return val
 }
 
 
 //The minimal code to allow for Aether->World Crossing.
function main() {
   console.log("**************Unreal TCP Server Started************")

   class MyTCP extends Root.ResolveClass('TCP') {
      MessageReceived(racketMessage) {
         let messages = racketMessage.split("\n").filter((m)=>m.length > 0)
         messages.map((racketMessage) => {
            console.log(racketMessage)
            racketMessage = JSON.parse(racketMessage)
            console.log("In MessageReceived(racketMessage)")
            console.log(racketMessage)
            //console.log(script)

            var val;

            try {
               val = eval(racketMessage["jsSnippet"])
            } catch (e) {
               console.log(racketMessage)
               console.log(e)
               val = { type: "error", error: e.toString() }
            }

            //console.log(val)
            //var payload = "{eventType: " + racketMessage["eventType"] + ", eventData: \"" + JSON.stringify(simplify(val)) + "\"}"

            //Wish this would just work...
            //var payload = JSON.stringify({eventType: {racketMessage["eventType"], eventData: (simplify(val))})

            //But alas, Unreal.js makes me do this for some reason...
            var payload = `{"eventType": ${racketMessage["eventType"]}, "eventData": ${JSON.stringify(simplify(val))}}`

            console.log(payload)
            console.log("Sending payload")


            this.SendMessage(payload + "\n")
            console.log("Payload sent")
         })
         //TODO: Send back payload
      }
      GetModDirectoryFromName(name) {
         return { ModDirectory: modDirectories[name] }
      }
      GetUnrealServerPort() {
         let match = KismetSystemLibrary.GetCommandLine().match(/-unreal-server=(\d+)/)
         let port = match ? match[1] : 8080
         return { Port: +port };
      }
      GetCodeSpellsServerPort() {
         let match = KismetSystemLibrary.GetCommandLine().match(/-codespells-server=(\d+)/)
         let port = match ? match[1] : 8081
         return { Port: +port };
      }
   }

   let MyTCP_C = require('uclass')()(global, MyTCP);
   let s = new MyTCP_C(GWorld, { X: 7360.0, Y: 3860.0, Z: 7296.0 }, { Yaw: 180 });
   console.log("JS Server started!", s.GetUnrealServerPort().Port);

   return function () {
      s.DestroyActor()
   }
}

// bootstrap to initiate live-reloading dev env.
try {
   module.exports = () => {

      let cleanup = null

      // wait for map to be loaded.
      process.nextTick(() => cleanup = main());

      // live-reloadable function should return its cleanup function
      return () => cleanup()
   }
}
catch (e) {
   console.log("Error", e);
   require('bootstrap')('on-start')
}