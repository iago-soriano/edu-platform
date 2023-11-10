import { DomainRules } from "@edu-platform/common";

export class ActivityStatus {
    static activityPossibleStatus = ["Draft", "Archived", "Published"];

  _validateStatus(activityStatus: string) {
    for (let status of activityStatus) {
        if (status === activityStatus) {
            return true
        }; 
    }
  }

  

 
}
