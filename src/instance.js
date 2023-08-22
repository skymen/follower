function getInstanceJs(parentClass, scriptInterface, addonTriggers, C3) {
  return class extends parentClass {
    constructor(inst, properties) {
      super(inst);

      this.followMode = 0;
      this.followSpeed = 0;
      this.followDistance = 0;
      this.setAngle = false;
      this.axes = {
        x: true,
        y: true,
        z: false,
        a: false,
      };
      this.target = null;
      this.autoTargetParent = false;

      if (properties) {
        this.followMode = properties[0];
        this.followSpeed = properties[1];
        this.followDistance = properties[2];
        this.setAngle = properties[3];
        this.axes = {
          x: properties[4],
          y: properties[5],
          z: properties[6],
          a: properties[7],
        };
        this.autoTargetParent = properties[8];
      }
      this.angleOfMotion = 0;
      this.wayPoints = [];

      if (this.autoTargetParent) {
        this._StartTicking();
      }
    }

    Release() {
      super.Release();
    }

    SaveToJson() {
      return {
        // save state for savegames
        followMode: this.followMode,
        followSpeed: this.followSpeed,
        followDistance: this.followDistance,
        setAngle: this.setAngle,
        targetUid: this.target ? this.target.GetUID() : -1,
        axes: this.axes,
        wayPoints: this.wayPoints,
      };
    }

    LoadFromJson(o) {
      // load state for savegames
      this.followMode = o.followMode;
      this.followSpeed = o.followSpeed;
      this.followDistance = o.followDistance;
      this.setAngle = o.setAngle;
      if (o.targetUid !== -1)
        this.target = this._runtime.GetInstanceByUID(o.targetUid);
      else this.target = null;
      this.axes = o.axes;
      this.wayPoints = o.wayPoints;
    }

    PushWayPoint(x, y, z, a) {
      if (this.followMode === 1) {
        this.wayPoints.push({
          x,
          y,
          z,
          a,
        });
      } else {
        this.wayPoints = [
          {
            x,
            y,
            z,
            a,
          },
        ];
      }
    }

    UpdateTarget() {
      if (this.target === null) {
        return;
      }
      const wi = this.target.GetWorldInfo();
      const x = wi.GetX();
      const y = wi.GetY();
      const z = wi.GetZElevation();
      const a = wi.GetAngle();
      this.PushWayPoint(x, y, z, a);
    }

    Distance1D(start, end) {
      return Math.abs(end - start);
    }

    Distance2D(start, end) {
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    Distance3D(start, end) {
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const dz = end.z - start.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    Distance(start, end) {
      if (this.axes.x && this.axes.y && this.axes.z) {
        return this.Distance3D(start, end);
      } else if (this.axes.x && this.axes.y) {
        return this.Distance2D(start, end);
      } else if (this.axes.x && this.axes.z) {
        return this.Distance2D(
          {
            x: start.x,
            y: start.z,
          },
          {
            x: end.x,
            y: end.z,
          }
        );
      } else if (this.axes.y && this.axes.z) {
        return this.Distance2D(
          {
            x: start.y,
            y: start.z,
          },
          {
            x: end.y,
            y: end.z,
          }
        );
      } else if (this.axes.x) {
        return this.Distance1D(start.x, end.x);
      } else if (this.axes.y) {
        return this.Distance1D(start.y, end.y);
      } else if (this.axes.z) {
        return this.Distance1D(start.z, end.z);
      } else {
        return 0;
      }
    }

    RemainingDistance() {
      const wi = this._inst.GetWorldInfo();
      const curPos = {
        x: wi.GetX(),
        y: wi.GetY(),
        z: wi.GetZElevation(),
      };

      let distance = this.Distance(curPos, this.wayPoints[0]);
      for (let i = 0; i < this.wayPoints.length - 1; i++) {
        distance += this.Distance(this.wayPoints[i], this.wayPoints[i + 1]);
      }
      return distance;
    }

    Tick() {
      const wi = this._inst.GetWorldInfo();
      if (this.target === null && this.autoTargetParent && wi.HasParent()) {
        const parWi = wi.GetParent();
        this.target = parWi._inst;
        parWi.RemoveChild(wi);
        this.autoTargetParent = false;
      }

      if (this.target === null && this.wayPoints.length === 0) {
        this._StopTicking();
        return;
      }
      if (this.target !== null) this.UpdateTarget();
      const curPos = {
        x: wi.GetX(),
        y: wi.GetY(),
        z: wi.GetZElevation(),
      };

      let speed = this.followSpeed;

      let endPos = {
        x: curPos.x,
        y: curPos.y,
        z: curPos.z,
      };

      const remainingDistance = this.RemainingDistance();

      let lastAngle = null;
      if (this.followMode === 1 && speed < 0) {
        if (remainingDistance > this.followDistance) {
          while (this.wayPoints.length > Math.abs(speed)) {
            let nextWp = this.wayPoints.shift();
            if (nextWp) {
              endPos = {
                x: nextWp.x,
                y: nextWp.y,
                z: nextWp.z,
              };
            }
          }
        }
      } else {
        const dt = this._runtime.GetDt(this._inst);
        if (this.followMode === 2) {
          speed =
            Math.max(0, remainingDistance - this.followDistance) *
            this.followSpeed;
        }

        let distance = 0;
        let maxDistance = Math.min(
          speed * dt,
          Math.max(0, remainingDistance - this.followDistance)
        );

        if (maxDistance <= 0) {
          return;
        }

        while (this.wayPoints.length > 0 && distance < maxDistance) {
          const wp = this.wayPoints[0];
          // the distance to calculate needs to take into account only the axes
          // that are enabled
          const dist = this.Distance(curPos, wp);
          if (dist <= maxDistance - distance) {
            this.wayPoints.shift();
            distance += dist;
            if (this.axes.a) {
              lastAngle = wp.a;
            }
            if (this.axes.x) {
              endPos.x = wp.x;
            }
            if (this.axes.y) {
              endPos.y = wp.y;
            }
            if (this.axes.z) {
              endPos.z = wp.z;
            }
          } else {
            const moveFraction = (maxDistance - distance) / dist;
            if (this.axes.x) {
              endPos.x = endPos.x + (wp.x - endPos.x) * moveFraction;
            }
            if (this.axes.y) {
              endPos.y = endPos.y + (wp.y - endPos.y) * moveFraction;
            }
            if (this.axes.z) {
              endPos.z = endPos.z + (wp.z - endPos.z) * moveFraction;
            }
            if (this.axes.a) {
              if (lastAngle !== null)
                lastAngle = C3.angleLerp(lastAngle, wp.a, moveFraction);
              else lastAngle = wp.a;
            }
            distance = maxDistance;
          }
        }
      }

      if (
        Object.keys(endPos).every((k) => {
          if (this.axes[k]) {
            return endPos[k] === curPos[k];
          } else {
            return true;
          }
        })
      ) {
        return;
      }

      if (this.axes.x && this.axes.y)
        this.angleOfMotion = C3.angleTo(curPos.x, curPos.y, endPos.x, endPos.y);
      if (this.setAngle && this.axes.a && lastAngle !== null) {
        wi.SetAngle(lastAngle);
      } else if (this.setAngle && this.axes.x && this.axes.y) {
        wi.SetAngle(this.angleOfMotion);
      }

      if (this.axes.x) {
        wi.SetX(endPos.x);
      }
      if (this.axes.y) {
        wi.SetY(endPos.y);
      }
      if (this.axes.z) {
        wi.SetZElevation(endPos.z);
      }
      wi.SetBboxChanged();
    }

    Trigger(method) {
      super.Trigger(method);
      const addonTrigger = addonTriggers.find((x) => x.method === method);
      if (addonTrigger) {
        this.GetScriptInterface().dispatchEvent(new C3.Event(addonTrigger.id));
      }
    }

    GetScriptInterfaceClass() {
      return scriptInterface;
    }

    // ==== ACTIONS ====
    _SetFollowMode(mode) {
      this.followMode = mode;
    }
    _SetFollowSpeed(speed) {
      this.followSpeed = speed;
    }
    _SetFollowDistance(distance) {
      this.followDistance = distance;
    }
    _Follow(object) {
      this.target = object.GetFirstPicked();
      this.wayPoints = [];
      this._StartTicking();
    }
    _Unfollow() {
      this.target = null;
      this.wayPoints = [];
      this._StopTicking();
    }
    _SetAngleToAngleOfMotion(angle) {
      this.setAngle = angle;
    }
    _SetAxes(x, y, z) {
      this.axes = {
        x,
        y,
        z,
      };
    }
    _AddWaypoint(x, y, z, a) {
      this.PushWayPoint(x, y, z, a);
    }
    _ClearWaypoints() {
      this.wayPoints = [];
    }
    _SetWaypoint(index, x, y, z, a) {
      if (index >= this.wayPoints.length || index < 0) {
        return;
      }
      this.wayPoints[index] = {
        x,
        y,
        z,
        a,
      };
    }
    _RemoveWaypoint(index) {
      if (index >= this.wayPoints.length || index < 0) {
        return;
      }
      this.wayPoints.splice(index, 1);
    }
    // ==== CONDITIONS ====
    _IsFollowing() {
      return this.wayPoints.length > 0 || this.target !== null;
    }
    _IsAngleSetToAngleOfMotion() {
      return this.setAngle;
    }
    // ==== EXPRESSIONS ====
    _FollowDistance() {
      return this.followDistance;
    }
    _FollowTargetUID() {
      return this.target ? this.target.GetUID() : -1;
    }
    _Speed() {
      return this.followSpeed;
    }
    _AngleOfMotion() {
      return this.angleOfMotion;
    }
    _WayPointX(index) {
      if (index >= this.wayPoints.length || index < 0) {
        return;
      }
      return this.wayPoints[index].x;
    }
    _WayPointY(index) {
      if (index >= this.wayPoints.length || index < 0) {
        return;
      }
      return this.wayPoints[index].y;
    }
    _WayPointZ(index) {
      if (index >= this.wayPoints.length || index < 0) {
        return;
      }
      return this.wayPoints[index].z;
    }
    _WayPointAngle(index) {
      if (index >= this.wayPoints.length || index < 0) {
        return;
      }
      return this.wayPoints[index].a;
    }
    _WayPointCount(index) {
      this.wayPoints.length;
    }
  };
}
