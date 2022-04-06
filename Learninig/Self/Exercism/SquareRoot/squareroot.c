#include <inttypes.h>
#include <stdio.h>


uint16_t square_root(uint16_t number){
    uint16_t x;
    x = number;  
    uint16_t c = 0;
    uint16_t d = 1 << 15;
     while (d > number) d >>= 2;
     while (d != 0)
          { if (x >= c + d)
          { x -= c + d;
           c = (c >> 1) + d;
            } else
            c >>= 1;
           
            d >>= 2;
          }
return c;
}

int main(int argc, char const *argv[])
{
    
    printf("%" PRIu16 "\n",square_root(81));
 
  
   
    return 0;
}
