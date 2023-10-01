import React, { useEffect } from "react";
// import Question from "./questions";
import Question from "./questions";

export default function Modal() {
  useEffect(() => {
    function onstartup() {
      document.getElementById("myModal").style.display = "block";
    }
    onstartup();
  }, []);

function exit() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

  window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        {/* <span onClick={exit} className="close">&times;</span> */}
        {/* ^ X button */}
        <Question />
      </div>
    </div>
  );
}
