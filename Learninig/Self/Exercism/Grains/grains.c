#include <stdio.h>
#i
#include <stdint.h>
#include <inttypes.h>
uint64_t square(uint8_t index){
    if(index==0) return 0;
    uint64_t s= 1ull ;
    s = s << index-1;
    
    return s;
}

int main()
{
    printf("%" PRIu64 "\n", square(64));
}
