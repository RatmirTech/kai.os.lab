#include <stdio.h>
int main()
{
   int low, high, incr;
   float gals, ltrs;
   
   low = 1;
   high = 20;
   incr = 1;
   gals = low;
   while (gals <= high)
   {
	ltrs = (gals * 3.785);
	printf("%4.f %6.2f\n", gals, ltrs);
	gals = gals + incr;
   }
   return 0;
}
