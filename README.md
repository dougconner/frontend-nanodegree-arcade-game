frontend-nanodegree-arcade-game
===============================

Instructions to play the game:

The goal of the game is for the player to move from the start position to the water while avoiding a collision with an enemy. A collision occurs if the enemy enters the same square as the player. If a collision occurs, that crossing attempt is lost and the player is returned to the start position. The "Losses" counter increments. If the player reaches the water, that attempt is successful, the "Wins" counter increment, and the player is returned to the start position for another attempt. Movement is controlled by the four keyboard arrow keys. The move happens on key release.

The "Score" is the ratio of successful crossings (Wins) to the sum of both "Wins" and "Losses".

The "p" key lets you select the player avatar from the five displayed by moving the "blue gem" to the desired avatar. The score will reset and the game will start.

The "s" key will reset the score and start the game with either the default player avatar (if none has been selected) or with the previously selected avatar.

The 3, 4, or 5 numeric keys let you select the number of enemies created. The default number is 4. Selecting the number of enemies will reset the score.
