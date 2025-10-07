import React from 'react';
import './combatTracker.css'

export function CombatTracker() {
  return (
    <main>
      <section class = "textbox" id = "players">
        <h3>PCs</h3>
        <table>
            <tr>
              <th>Name</th>
              <th>HP</th>
              <th>Physical Def.</th>
              <th>Cognitive Def.</th>
              <th>Spiritual Def.</th>
            </tr>

            <tr>
              <td>Dannic</td>
              <td>20</td>
              <td>14</td>
              <td>14</td>
              <td>14</td>
            </tr>

        </table>
      
      </section>
      
      <hr/>

      <section class = "textbox" id = "NPCs">
        <h3>NPCs</h3>
        <table>
            <tr>
              <th>Name</th>
              <th>HP</th>

              <th>Physical Def.</th>
              <th>Cognitive Def.</th>
              <th>Spiritual Def.</th>
            </tr>

            <tr>
              <td>Thug</td>
              <td>11</td>
              <td>12</td>
              <td>10</td>
              <td>12</td>
            </tr>

        </table>
      
      </section>
      <section id = "Music">
        <iframe 
          width="280" 
          height="157" 
          src="https://www.youtube.com/watch?v=k9o9G8ZJ1do&list=RDk9o9G8ZJ1do&start_radio=1&t=887s" 
          title="stormlight music" 
          frameborder="0" 
          allowfullscreen>
        </iframe>
      
      </section>
      <img id = "AvT" alt="Adolin jumping on a Thunderclast" src="https://pbs.twimg.com/media/Gvqdj96W0AACiGY.jpg:large" />
      
    </main>
  );
}