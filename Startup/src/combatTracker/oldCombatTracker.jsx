import React from 'react';
import './combatTracker.css'

export function CombatTracker() {
  return (
    <main>
      <section className = "textbox" id = "players">
        <h3>PCs</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>HP</th>
              <th>Physical Def.</th>
              <th>Cognitive Def.</th>
              <th>Spiritual Def.</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Dannic</td>
              <td>20</td>
              <td>14</td>
              <td>14</td>
              <td>14</td>
            </tr>
            </tbody>

        </table>
      
      </section>
      
      <hr/>

      <section className = "textbox" id = "NPCs">
        <h3>NPCs</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>HP</th>

              <th>Physical Def.</th>
              <th>Cognitive Def.</th>
              <th>Spiritual Def.</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Thug</td>
              <td>11</td>
              <td>12</td>
              <td>10</td>
              <td>12</td>
            </tr>
          </tbody>
        </table>
      
      </section>
      
      <img id = "AvT" alt="Adolin jumping on a Thunderclast" src="https://pbs.twimg.com/media/Gvqdj96W0AACiGY.jpg:large" />
      
    </main>
  );
}