import conferences from "./conferences";
import firebase from "firebase";

export function saveEventsToFB() {
  console.log("saveEventsToFB");
  const eventsRef = firebase.database().ref("/events");
  conferences.forEach(conference => eventsRef.push(conference));
}

window.runMigration = function() {
  firebase
    .database()
    .ref("/events")
    .once("value")
    .then(data => {
        console.log(!data.val())
      if (!data.val()) {
          saveEventsToFB();
      }
    });
};
