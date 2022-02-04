# CodeSpells Unreal

So you're ready to use CodeSpells for your next Unreal project?  Great!  Let's get started.

*Step 1: Install React Stuff*

1) TODO: Write better instructions.  For now, see https://github.com/srfoster/nexus
2) Run `npm start` in `frontend/`

*Step 2: Install Racket*

1) TODO: Write better instructions.  For now, see https://github.com/srfoster/nexus
2) Run `racket web-ui.rkt` in `nexus-client/`

*Step 3: Create an Unreal Project and Install the Plugins* 

1) Create a new Unreal Project.
2) In Plugins, enable "Web Brower" plugin
3) Install Unreal.js (see their Manual installation instructions on their github repo, or install from the marketplace)
4) Install Spartan Tools's TCP Server plugin
5) Clone this repo into your `Plugins/` directory.  Enable both plugins (MagicalOrbs and UnrealJSBridge).
6) Drag a `JS` object (from `UnrealJSBridge` plugin) into your level
7) Drag a `BrowserLoader`  (from `UnrealJSBridge` plugin) into your level
8) Start the level.  You should see whatever is running on `localhost:3000/clean` displayed in your level.
