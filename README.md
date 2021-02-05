# Take me out to the ballgame

https://take-me-out-to-the-ballgame.herokuapp.com/

## Usage

The hours spent on this project can be found on the projecthours.txt thing.

The scorecards can be filled by first choosing the away and home teams,
and their respective batting orders.

The application does its best to minimize erroneous user input,
however, not all conceptual errors can be handled easily.

The strike count checkboxes are there just for the sake of additional information.

The payoff input will bring up individual options,
for example, an additional input to specify the total bases on a base hit.

The input also takes into account the fact that no runs batted in can be awarded,
if the payoff was a strikeout or a double play.

The diamond does not result in any additional information on the batting statistics,
it is purely for clarificational purposes, much like the strike count checkboxes.

Depending on the payoff, the diamond is also colored accordingly,
automatically coloring home to first on a base on balls or a hit by pitch,
and, on a base hit, automatically coloring however many bases the hit resulted in.

The lines can also be drawn manually by clicking,
and erroneous line drawing can be reversed by clicking on the painted line again.

The data filled in onto the scorecard will automatically update the batting statistics.

The pitching scorecard is operated via manual number input,
and the numbers can also be incremented or decremented via the clickers.

The input field for innings pitched is a text input,
taking in numbers from 0 to 99,
with a postfix of + if the pitcher failed to record an out in said inning,
and allowing for 1/3 and 2/3 after the number of innings,
in case of a relief pitcher coming in during an inning.

The box score is automatically updated from the scorecard input,
and it includes a simple button in case of extra innings,
adding one more on each click.

The navigation bar below will take the user instantly to another view within the application.

New players and new teams may be added from the additional pages listed above.

Certain attributes of existing teams and players may also be modified,
from their respective pages.
