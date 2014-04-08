# Random Color Generator

For generating attractive random colors.

## How it works

If a hue (color) is specified, the range of the H value is bound.
Else a hue is generated randomly between 0 and 360
   - consider making certain h values less likely to occur, there's a lot of green and red on the spectrum

If a brightness is specified, the range of the V and S values are bound
   bright colors have high V values
   light colors have high V values and low s values
Else V and S values are generated based on the H value
