
var tempStream;

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA43cFkz3-fQjMvh6J3ABp7k1TjYvB4jGE",
    authDomain: "sist-distribuidos-f4dfb.firebaseapp.com",
    databaseURL: "https://sist-distribuidos-f4dfb.firebaseio.com",
    projectId: "sist-distribuidos-f4dfb",
    storageBucket: "sist-distribuidos-f4dfb.appspot.com",
    messagingSenderId: "1037688823491",
    appId: "1:1037688823491:web:a70551246d2a7cdd060c76",
    measurementId: "G-Y1VLE3L5WQ"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.database();

const docRef = firestore.ref("teste/documento");
const output = document.querySelector("#testeOutput");

getUpdate = function() {

    docRef.on('value', function (doc){
        if (doc && doc.exists) {
            const myData = doc.val();
            //output.innerHTML = myData.statusTeste2;
            tempStream = myData.statusTeste2;
        }
    })
/*
    docRef.onSnapshot(function (doc){
        if (doc && doc.exists) {
            const myData = doc.data();
            output.innerHTML = myData.statusTeste2;
        }
    })
    */
}

getUpdate();