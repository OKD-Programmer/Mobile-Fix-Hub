// src/Pages/Repair.js
import Accordion from "../Components/Accordion";
import "../Styles/accordion.css";

export const Repair = () => {
  return (
    <div className="page">
      <h1>Mobile Repair Guide</h1>

      <Accordion title="➤ Screen Replacement 📱">
        <p><strong>Step 1:</strong> Power off the device.</p>
        {/* FIX: Changed class to className */}
        <div className="tab">
          ● Hold the power button and choose “Shut Down”.<br></br>
          ● Remove the SIM tray.
        </div>

        <p><strong>Step 2:</strong> Remove back cover or screen.</p>
        <div className="tab">
          ● Heat the edges with a heat gun or hair dryer.<br></br>
          ● Use a suction cup to lift the glass.<br></br>
          ● Insert plastic picks to slice the adhesive.
        </div>

        <p><strong>Step 3:</strong> Disconnect the battery.</p>
        <div className="tab">
          ● Remove protective screws/plates.<br></br>
          ● Lift the battery connector with a plastic tool.
        </div>

        <p><strong>Step 4:</strong> Disconnect screen cables.</p>
        <div className="tab">
          ● Locate display & digitizer connectors.<br></br>
          ● Disconnect them gently using a spudger.
        </div>

        <p><strong>Step 5:</strong> Remove the broken screen.</p>
        <div className="tab">
          ● Lift the screen fully from the frame.<br></br>
          ● Clean leftover adhesive from the edges.
        </div>

        <p><strong>Step 6:</strong> Install the new screen.</p>
        <div className="tab">
          ● Connect display cables.<br></br>
          ● Reconnect battery temporarily.<br></br>
          ● Power on and test touch/display.
        </div>

        <p><strong>Step 7:</strong> Apply adhesive and close.</p>
        <div className="tab">
          ● Apply adhesive or pre-cut adhesive strips.<br></br>
          ● Press the new screen firmly into place.
        </div>

        <p><strong>Step 8:</strong> Final assembly & testing.</p>
        <div className="tab">
          ● Reinstall screws and covers.<br></br>
          ● Test touch, display, camera, and sensors.
        </div>
      </Accordion>

      <Accordion title="➤ Battery Replacement 🔋">
        <p><strong>Step 1:</strong> Power off the device.</p>
        <div className="tab">
          ● Shut down the device completely.<br></br>
          ● Remove the SIM tray.<br></br>
        </div>

        <p><strong>Step 2:</strong> Open the back cover.</p>
        <div className="tab">
          ● Heat the edges to soften adhesive.<br></br>
          ● Use a suction cup to lift the cover.<br></br>
          ● Slide plastic picks to loosen adhesive.<br></br>
          ● Disconnect fingerprint sensor if attached.
        </div>

        <p><strong>Step 3:</strong> Remove protective shields.</p>
        <div className="tab">
          ● Unscrew and remove the metal shield over the battery connector.
        </div>

        <p><strong>Step 4:</strong> Disconnect the battery.</p>
        <div className="tab">
          ● Use a plastic tool to pry up the battery connector.
        </div>

        <p><strong>Step 5:</strong> Remove the old battery.</p>
        <div className="tab">
          ● Pull adhesive strips if available.<br></br>
          ● If not, heat and gently pry out the battery.<br></br>
          ● Do NOT bend or puncture the battery.
        </div>

        <p><strong>Step 6:</strong> Install the new battery.</p>
        <div className="tab">
          ● Place new battery and connect the flex cable.<br></br>
          ● Reinstall the metal shield and screws.
        </div>

        <p><strong>Step 7:</strong> Reassemble the phone.</p>
        <div className="tab">
          ● Reconnect the back cover.<br></br>
          ● Apply or replace adhesive if needed.
        </div>

        <p><strong>Step 8:</strong> Final testing.</p>
        <div className="tab">
          ● Turn on the device.<br></br>
          ● Check charging, battery status, and back cover seal.
        </div>
      </Accordion>
    </div>
  );
};
