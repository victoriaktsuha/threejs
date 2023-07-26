/* Vector3 */

/*
All about the Vector3 and some common uses cases.

A Vector3 can be used to describe a position, a direction, a momentum or just series a series of 3 values. The values of the Vector3 are x, y and z.

The 1st Vector3 method that I will demonstrate is the normalize() method. It will take the 3 numbers, and scale them so that the distance between 0,0,0 and the values contained in its positions x, y, z will be length 1.

I.e., A vector of {x:1, y:1, z:0}, when normalized, will become {x:0.7071067811865475, y:0.7071067811865475, z:0}. 0.7071067811865475 also happens to equal the sine of 45 degrees.

If you had a cube with many segments, you could normalize all the points in the geometry, and then you would end up with a sphere.
*/
