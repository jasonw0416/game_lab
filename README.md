# game_lab

Before you start the games, the client has an ability to choose room: room1, room2, room3. This is done by clicking one of three buttons on the top left. In addition to these three rooms, the players have the ability to create their own room and join other people's room using their own codes.

After two players join the same room, they are to choose either red or blue. This is done by clicking "choose red" or "choose blue" buttons.

Each players are now able to interact with the grey grid. The player with red color goes first. They each take turns and they are not able to place their new piece until the opponents choose. Their objective is to connect 5 pieces of same color in order to win. This can be done vertically, horizontally, or diagonally. 

If you decide to join different room, your board will reset, leave the previous room, and join the new room. 

The users are also able to chat through the text boxes. Your chat will only be displayed if you are in the same room.

The users now have an ability to request restart now. Their request to restart the match will be sent to the opponent, and if he or she accepts it, the board will reset and the game will restart. 

The server is done by socket.io and express.

We used form of div and main.css with more functions in javascript to click on the grid and assign the "square" object either "red" or "blue" class in main.css that colors the object.

You can access our web game in https://stark-cove-49706.herokuapp.com/

# Protocol:
## Message from Server to Client:
Message: The typical message from server to client that is printed. Mostly chatting messages.
Red: A player has put down the red piece on the board
Blue: A play has put down the blue piece on the board
Joining: The user has successfully joined the room.
Join_error: There was error in the user’s attempt to join the server as the room does not exist.
Create_error: There was an error in the user’s attempt to create the server as the room already exists.
Creating: The user has successfully created and joined the room
Restart-request: A player has requested to restart the game and sends to the opponent
Restart-yes: A player has accepted the request to restart
Restart-no: A player has declined the request to restart
Left: A player has left the room, notifying the other player.
Disconnection: A player has disconnected (possibly leave the browser) from the room, notifying the other player in the room.

## Message from Client to Server
Message room:The player has sent a message to the room.
Create_attempt: A player is attempting to create room and request its permission to the server
Join_atttempt: A player is attempting to join different room and request its permission to the server
Leave: A player has left the current room
Join: A player has joined the new room.
Red: A player has put down a red piece on the board.
Blue: A player has put down a blue piece on the board.
Request-restart: A player is sending request to restart the game to the opponent
Restart-yes: A player replied yes to the opponent’s request to restart
Restart-no: A player replied no to the opponent’s request to restart
Disconnect: A player has disconnected (possibly leave the page or disconnect from internet) from the room; it is a default message that is sent whenever a client disconnects from the server. 
