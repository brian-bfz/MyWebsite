// Simple friend-level protection. Do not store real secrets here.
const SECRETS = {
  // puzzle 1 location is disclosed to the user
  puzzle1: {
    password: "0512",
    title: "Fragments",
    html: `
<style>
  .blank {
    border: 1px solid #ccc;
    display: inline-block;
    font-family: monospace;
    margin: 0 4px;
    padding: 2px 8px;
  }
</style>

<p>On our first trip together, we went to
  <span class="blank">_ _ _ _</span>
</p>
<p>On Dec 21st, Columbia had its first
  <span class="blank">_ _ _ _</span>
</p>
<p>There was a fire evacuation in
  <span class="blank">_ _ _</span>
</p>
<p>We sneaked onto the rooftop of
  <span class="blank">_ _ _</span>
</p>
<p>We did our physics homework till 2am in
  <span class="blank">_ _ _</span>, then watched the stars.
</p>
<p>N E R E T T N N A S O B R W L N S C E U L H T P T R I W N</p>
<a href="https://registrar.columbia.edu/content/building-codes">
  <blockquote>
    What matter aren't the problems you solve, but the bits you leave behind.<br>
    Scrambled as they are, they spell out the secrets of the universe.
  </blockquote>
</a>`
  },
  puzzle2_location: {
    password: "INTERSTELLAR",
    title: "Mission 2",
    html: `<p>Find Liam.</p>
<p style="display: none;">Secret location: airr zsjsz 13 ghowfg</p>`
  },
  puzzle2: {
    password: "6439",
    title: "Center",
    html: `
<style>
  .blank {
    border: 1px solid #ccc;
    display: inline-block;
    font-family: monospace;
    margin: 0 4px;
    padding: 2px 8px;
  }
</style>

<p>When we were lying on the Butler Lawn, Liam shouted in
    <span class="blank">_ _ _ _ _ _ _ _ _</span>
</p>
<p>Brian met Liam while carrying a
  <span class="blank">_ _ _ _ _ _</span>
  <span class="blank">_ _ _</span>
</p>
<p>Brian lacks the basic life skill to tell part
  <span class="blank">_ _ _ _ _ _</span>
  and
  <span class="blank">_ _ _ _ _ _ _</span>
</p>
<p>At the party, Olena was
    <span class="blank">_ _ _ _ _</span>
    <span class="blank">_ _ _ _ _ _ _ _</span>
</p>
<blockquote>Four questions, four letters, the password is in the middle of all these answers.</blockquote>`
  },
  puzzle3_location: {
    password: "INFO",
    title: "FINAL MISSION",
    html: `<p><strong>Find Yuri, Reckoner of Relativity, and FIGHT HIM.<strong></p>`
  }
};

module.exports = { SECRETS };
