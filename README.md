## Seesaw Simulation

This project is a seesaw simulation. Users can monitor torque, balance, and tilt angle by adding or removing weight.

Seesaw Simulation was developed using only HTML, CSS and JavaScript.

When the user clicks on the plank, a new weight circle is created and its position is calculated. The weight is added to the left or right side using the distance from the center of the plank.

The plank angle is calculated from the difference between the total torque on the left and right sides. The angle is limited to ±30° and shown on the screen.

Every click by the user is saved in a history log.

When the Reset button is clicked, all weights are removed from the plank, the values ​​are reset and the history is cleared.

# Calculations

Each weight has a torque depending on its distance from the center:

Torque = Weight × DistanceFromCenter

The plank angle is calculated from the difference between right and left torques:

Angle = (RightTorque - LeftTorque) / 10

The angle is limited to ±30°
