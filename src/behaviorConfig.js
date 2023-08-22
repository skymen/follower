// WARNING: DO NOT EDIT THIS FILE, IT IS AUTOGENERATED
module.exports = {
  addonType: "behavior",
  id: "skymen_follower",
  name: "Follower",
  version: "1.0.0.0",
  category:
    // "attributes",
    "movements",
  // "other",
  // "general",
  author: "skymen",
  website: "https://www.construct.net",
  documentation: "https://www.construct.net",
  description: "Follows a target object or a path of waypoints",
  // icon: "icon.svg", // defaults to "icon.svg" if omitted
  // addonUrl: "https://www.construct.net/en/make-games/addons/####/XXXX", // displayed in auto-generated docs
  // githubUrl: "https://github.com/skymen/XXXX", // displays latest release version in auto-generated docs
  fileDependencies: [
    /*
    {
      filename: "filename.js", // no need to include "c3runtime/" prefix
      type:
        "copy-to-output"
        "inline-script"
        "external-dom-script"
        "external-runtime-script"
        "external-css"

      // for copy-to-output only
      // fileType: "image/png"
    }
    */
  ],
  info: {
    Set: {
      IsOnlyOneAllowed: false,
      CanBeBundled: true,
      IsDeprecated: false,
    },
  },
  properties: [
    /*
    {
      type:
        "integer"
        "float"
        "percent"
        "text"
        "longtext"
        "check"
        "font"
        "combo"
        "group"
        "link"
        "info"

      id: "property_id",
      options: {
        initialValue: 0,
        interpolatable: false,

        // minValue: 0, // omit to disable
        // maxValue: 100, // omit to disable

        // for type combo only
        // items: [
        //   {itemId1: "item name1" },
        //   {itemId2: "item name2" },
        // ],

        // dragSpeedMultiplier: 1, // omit to disable

        // for type link only
        // linkCallback: `function(instOrObj) {}`,
        // linkText: "Link Text",
        // callbackType:
        //   "for-each-instance"
        //   "once-for-type"

        // for type info only
        // infoCallback: `function(inst) {}`,
      },
      name: "Property Name",
      desc: "Property Description",
    }
    */
    {
      type: "combo",
      id: "follow-mode",
      options: {
        initialValue: "direct",
        items: [
          { direct: "Direct" },
          { waypoint: "Waypoint" },
          { lerp: "Lerp" },
        ],
      },
      name: "Follow Mode",
      desc: "Direct = follow the target directly, Waypoint = follow a path of waypoints",
    },
    {
      type: "float",
      id: "follow-speed",
      options: {
        initialValue: 300,
      },
      name: "Follow Speed",
      desc: "Speed to follow the target at. In Waypoints mode, negative speed will do one waypoint at a time. In lerp mode, this is the lerp speed.",
    },
    {
      type: "float",
      id: "follow-distance",
      options: {
        initialValue: 100,
      },
      name: "Follow Distance",
      desc: "Distance to keep from the target",
    },
    {
      type: "check",
      id: "set-angle",
      options: {
        initialValue: true,
      },
      name: "Set Angle",
      desc: "Set the angle of the follower",
    },
    {
      type: "check",
      id: "x",
      options: {
        initialValue: true,
      },
      name: "Follow X",
      desc: "Follow the target on the X axis",
    },
    {
      type: "check",
      id: "y",
      options: {
        initialValue: true,
      },
      name: "Follow Y",
      desc: "Follow the target on the Y axis",
    },
    {
      type: "check",
      id: "z",
      options: {
        initialValue: false,
      },
      name: "Follow Z",
      desc: "Follow the target on the Z axis",
    },
    {
      type: "check",
      id: "angle",
      options: {
        initialValue: false,
      },
      name: "Follow Angle",
      desc: "Follow the target's angle",
    },
    {
      type: "check",
      id: "auto-target-parent",
      options: {
        initialValue: false,
      },
      name: "Auto Target Parent",
      desc: "Automatically target the parent of the follower",
    },
  ],
  aceCategories: {
    // follows the format id: langName
    // in the ACEs refer to categories using the id, not the name
    general: "General",
    params: "Parameters",
    waypoints: "Waypoints",
  },
  Acts: {
    /*
    SampleAction: {
      // The category of the action as it appears in the add action dialog
      category: "general",

      // Forward to the instance function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this action
      // Cases where you might not want this are:
      // 1- If the action params are incompatible with the script interface
      // 2- If you don't want it to appear in the script interface
      // 3- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the action in the add action dialog
      highlight: true,

      // Set to true to hide the action in the interface. False by default if not specified.
      deprecated: false,

      // Marks the action as async. Defaults to false if not specified.
      isAsync: false,

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
            - "boolean"

            // The following types can take a default value but CANNOT be automatically generated in the script interface
            - "combo"

            // The following types CANNOT take a default value AND CANNOT be automatically generated in the script interface
            - "cmp"
            - "object"
            - "objectname"
            - "layer"
            - "layout"
            - "keyb"
            - "instancevar"
            - "instancevarbool"
            - "eventvar"
            - "eventvarbool"
            - "animation"
            - "objinstancevar"

          // The default value of the parameter. Can be omitted if the type is not a string, number, any, boolean or combo.
          value: "the default value of the parameter",

          // Only for type "combo"
          items: [
            {"itemId1": "itemName1"},
            {"itemId2": "itemName2"},
            {"itemId3": "itemName3"},
          ],

          // Only for type "object"
          allowedPluginIds: ["Sprite", "TiledBg"],
        },
      ],

      // The name of the action as it appears in the add action dialog
      listName: "Sample Action",

      // The text that appears in the event sheet. Note, every single param must be used in the display text.
      // You can also use [b] and [i] tags.
      // You can also use the {my} tag to include the behavior icon and name.
      displayText: "{my}: Sample action [i]{0}[/i]",

      // The description of the action as it appears in the add action dialog
      description: "This is a sample action",
    },
    */
    SetFollowMode: {
      category: "params",
      forward: "_SetFollowMode",
      autoScriptInterface: false,
      params: [
        {
          id: "mode",
          name: "Mode",
          desc: "The follow mode",
          type: "combo",
          items: [
            { direct: "Direct" },
            { waypoint: "Waypoint" },
            { lerp: "Lerp" },
          ],
        },
      ],
      listName: "Set follow mode",
      displayText: "{my}: Set follow mode to [i]{0}[/i]",
      description: "Set the follow mode",
    },
    SetFollowSpeed: {
      category: "params",
      forward: "_SetFollowSpeed",
      autoScriptInterface: true,
      params: [
        {
          id: "speed",
          name: "Speed",
          desc: "The follow speed",
          type: "number",
          value: 300,
        },
      ],
      listName: "Set follow speed",
      displayText: "{my}: Set follow speed to [i]{0}[/i]",
      description: "Set the follow speed",
    },
    SetFollowDistance: {
      category: "params",
      forward: "_SetFollowDistance",
      autoScriptInterface: true,
      params: [
        {
          id: "distance",
          name: "Distance",
          desc: "The follow distance",
          type: "number",
          value: 100,
        },
      ],
      listName: "Set follow distance",
      displayText: "{my}: Set follow distance to [i]{0}[/i]",
      description: "Set the follow distance",
    },
    Follow: {
      category: "general",
      forward: "_Follow",
      autoScriptInterface: false,
      highlight: true,
      params: [
        {
          id: "target",
          name: "Target",
          desc: "The target to follow",
          type: "object",
          allowedPluginIds: ["Sprite", "TiledBg", "NinePatch"],
        },
      ],
      listName: "Follow",
      displayText: "{my}: Follow {0}",
      description: "Follow",
    },
    Unfollow: {
      category: "general",
      forward: "_Unfollow",
      autoScriptInterface: true,
      highlight: true,
      params: [],
      listName: "Unfollow",
      displayText: "{my}: Unfollow",
      description: "Unfollow",
    },
    _SetAngleToAngleOfMotion: {
      category: "params",
      forward: "_SetAngleToAngleOfMotion",
      autoScriptInterface: true,
      params: [
        {
          id: "angle",
          name: "Set Angle",
          desc: "Wether to set the angle to the angle of motion",
          type: "boolean",
          value: true,
        },
      ],
      listName: "Set angle to angle of motion",
      displayText: "{my}: Set angle to angle of motion [i]{0}[/i]",
      description: "Wether to set the angle to the angle of motion",
    },
    _SetAxes: {
      category: "params",
      forward: "_SetAxes",
      autoScriptInterface: true,
      params: [
        {
          id: "x",
          name: "X",
          desc: "Wether to follow on the X axis",
          type: "boolean",
          value: true,
        },
        {
          id: "y",
          name: "Y",
          desc: "Wether to follow on the Y axis",
          type: "boolean",
          value: true,
        },
        {
          id: "z",
          name: "Z",
          desc: "Wether to follow on the Z axis",
          type: "boolean",
          value: false,
        },
      ],
      listName: "Set axes",
      displayText:
        "{my}: Set axes to X: [i]{0}[/i], Y: [i]{1}[/i], Z: [i]{2}[/i]",
      description: "Wether to follow on the X, Y and Z axis",
    },
    AddWaypoint: {
      category: "waypoints",
      forward: "_AddWaypoint",
      autoScriptInterface: true,
      params: [
        {
          id: "x",
          name: "X",
          desc: "The X position of the waypoint",
          type: "number",
          value: 0,
        },
        {
          id: "y",
          name: "Y",
          desc: "The Y position of the waypoint",
          type: "number",
          value: 0,
        },
        {
          id: "z",
          name: "Z",
          desc: "The Z position of the waypoint",
          type: "number",
          value: 0,
        },
        {
          id: "angle",
          name: "Angle",
          desc: "The angle of the waypoint",
          type: "number",
          value: 0,
        },
      ],
      listName: "Add waypoint",
      displayText:
        "{my}: Add waypoint at X: [i]{0}[/i], Y: [i]{1}[/i], Z: [i]{2}[/i], Angle: [i]{3}[/i]",
      description: "Add a waypoint",
    },
    SetWaypoint: {
      category: "waypoints",
      forward: "_SetWaypoint",
      autoScriptInterface: true,
      params: [
        {
          id: "index",
          name: "Index",
          desc: "The index of the waypoint to set",
          type: "number",
          value: 0,
        },
        {
          id: "x",
          name: "X",
          desc: "The X position of the waypoint",
          type: "number",
          value: 0,
        },
        {
          id: "y",
          name: "Y",
          desc: "The Y position of the waypoint",
          type: "number",
          value: 0,
        },
        {
          id: "z",
          name: "Z",
          desc: "The Z position of the waypoint",
          type: "number",
          value: 0,
        },
        {
          id: "angle",
          name: "Angle",
          desc: "The angle of the waypoint",
          type: "number",
          value: 0,
        },
      ],
      listName: "Set waypoint",
      displayText:
        "{my}: Set waypoint [i]{0}[/i] to X: [i]{1}[/i], Y: [i]{2}[/i], Z: [i]{3}[/i], Angle: [i]{4}[/i]",
      description: "Set a waypoint",
    },
    RemoveWaypoint: {
      category: "waypoints",
      forward: "_RemoveWaypoint",
      autoScriptInterface: true,
      params: [
        {
          id: "index",
          name: "Index",
          desc: "The index of the waypoint to remove",
          type: "number",
          value: 0,
        },
      ],
      listName: "Remove waypoint",
      displayText: "{my}: Remove waypoint [i]{0}[/i]",
      description: "Remove a waypoint",
    },
    ClearWaypoints: {
      category: "waypoints",
      forward: "_ClearWaypoints",
      autoScriptInterface: true,
      params: [],
      listName: "Clear waypoints",
      displayText: "{my}: Clear waypoints",
      description: "Clear all waypoints",
    },
  },
  Cnds: {
    /*
    SampleCondition: {
      // The category of the action as it appears in the add condition dialog
      category: "general",

      // Forward to the instance function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this condition
      // Cases where you might not want this are:
      // 1- If the condition params are incompatible with the script interface
      // 2- If you don't want it to appear in the script interface
      // 3- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the condition in the add condition dialog
      highlight: true,

      // Set to true to hide the condition in the interface. False by default if not specified.
      deprecated: false,

      // special conditions properties. These can all be omitted, and they will default to the following values:
      isTrigger: false,
      isFakeTrigger: false,
      isStatic: false,
      isLooping: false,
      isInvertible: true,
      isCompatibleWithTriggers: true,

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
            - "boolean"

            // The following types can take a default value but CANNOT be automatically generated in the script interface
            - "combo"

            // The following types CANNOT take a default value AND CANNOT be automatically generated in the script interface
            - "cmp"
            - "object"
            - "objectname"
            - "layer"
            - "layout"
            - "keyb"
            - "instancevar"
            - "instancevarbool"
            - "eventvar"
            - "eventvarbool"
            - "animation"
            - "objinstancevar"

          // The default value of the parameter. Can be omitted if the type is not a string, number, any, boolean or combo.
          value: "the default value of the parameter",

          // Only for type "combo"
          items: [
            {"itemId1": "itemName1"},
            {"itemId2": "itemName2"},
            {"itemId3": "itemName3"},
          ],

          // Only for type "object"
          allowedPluginIds: ["Sprite", "TiledBg"],
        },
      ],

      // The name of the condition as it appears in the add condition dialog
      listName: "Sample Condition",

      // The text that appears in the event sheet. Note, every single param must be used in the display text.
      // You can also use [b] and [i] tags.
      // You can also use the {my} tag to include the behavior icon and name.
      displayText: "{my}: Sample condition [i]{0}[/i]",

      // The description of the condition as it appears in the add condition dialog
      description: "This is a sample condition",
    },
    */
    IsFollowing: {
      category: "general",
      forward: "_IsFollowing",
      autoScriptInterface: true,
      params: [],
      listName: "Is following",
      displayText: "{my}: Is following",
      description: "Is following",
    },
    IsAngleSetToAngleOfMotion: {
      category: "params",
      forward: "_IsAngleSetToAngleOfMotion",
      autoScriptInterface: true,
      params: [],
      listName: "Is angle set to angle of motion",
      displayText: "{my}: Is angle set to angle of motion",
      description: "Is angle set to angle of motion",
    },
  },
  Exps: {
    /*
    SampleExpression: {
      // The category of the action as it appears in the expression picker
      category: "general",

      // Forward to the instance function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this expression
      // Cases where you might not want this are:
      // 1- If you don't want it to appear in the script interface
      // 2- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the expression in the expression picker
      highlight: true,

      // Set to true to hide the expression in the interface. False by default if not specified.
      deprecated: false,

      // The type of the expression.
      returnType:
        - "string"
        - "number"
        - "any" // must be either string or number

      // Set to true if the expression is variadic. False by default if not specified.
      isVariadicParameters: false

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
        },
      ],

      // The description of the expression as it appears in the expression picker
      description: "This is a sample expression",
    },
    */
    FollowDistance: {
      category: "params",
      forward: "_FollowDistance",
      autoScriptInterface: true,
      params: [],
      returnType: "number",
      description: "Follow distance",
    },
    FollowTargetUID: {
      category: "general",
      forward: "_FollowTargetUID",
      autoScriptInterface: true,
      params: [],
      returnType: "number",
      description: "Follow target UID",
    },
    Speed: {
      category: "params",
      forward: "_Speed",
      autoScriptInterface: true,
      params: [],
      returnType: "number",
      description: "Speed",
    },
    AngleOfMotion: {
      category: "params",
      forward: "_AngleOfMotion",
      autoScriptInterface: true,
      params: [],
      returnType: "number",
      description: "Angle of motion",
    },
    WayPointX: {
      category: "waypoints",
      forward: "_WayPointX",
      autoScriptInterface: false,
      params: [
        {
          id: "index",
          name: "Index",
          desc: "The index of the waypoint",
          type: "number",
        },
      ],
      returnType: "number",
      description: "Waypoint X",
    },
    WayPointY: {
      category: "waypoints",
      forward: "_WayPointY",
      autoScriptInterface: false,
      params: [
        {
          id: "index",
          name: "Index",
          desc: "The index of the waypoint",
          type: "number",
        },
      ],
      returnType: "number",
      description: "Waypoint Y",
    },
    WayPointZ: {
      category: "waypoints",
      forward: "_WayPointZ",
      autoScriptInterface: false,
      params: [
        {
          id: "index",
          name: "Index",
          desc: "The index of the waypoint",
          type: "number",
        },
      ],
      returnType: "number",
      description: "Waypoint Z",
    },
    WayPointAngle: {
      category: "waypoints",
      forward: "_WayPointAngle",
      autoScriptInterface: false,
      params: [
        {
          id: "index",
          name: "Index",
          desc: "The index of the waypoint",
          type: "number",
        },
      ],
      returnType: "number",
      description: "Waypoint angle",
    },
    WayPointCount: {
      category: "waypoints",
      forward: "_WayPointCount",
      autoScriptInterface: false,
      params: [],
      returnType: "number",
      description: "Waypoint count",
    },
  },
};
