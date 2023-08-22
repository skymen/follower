function getScriptInterface(parentClass, map) {
  return class extends parentClass {
    constructor() {
      super();
      map.set(this, parentClass._GetInitInst().GetSdkInstance());

      this.FOLLOW_MODES = {
        DIRECT: 0,
        WAYPOINT: 1,
        LERP: 2,
      };
    }

    SetFollowMode(mode) {
      map.get(this).SetFollowMode(mode);
    }

    Follow(object) {
      const inst = map.get(this);
      if (object.getFirstInstance) {
        object = object.getFirstInstance();
      }
      inst.target = inst._runtime.GetInstanceByUID(object.uid);
      this._StartTicking();
    }

    get wayPoints() {
      return map.get(this).wayPoints;
    }

    get instance() {
      return map.get(this);
    }
  };
}
