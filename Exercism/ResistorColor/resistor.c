#include <stdio.h>
#include <string.h>
typedef enum {
	BLACK,
	BROWN,
	RED,
	ORANGE,
	YELLOW,
	GREEN,
	BLUE,
	VIOLET,
	GREY,
	WHITE
} resistor_band_t;

int color_code(resistor_band_t n)
{  
	return n;	
} 
int compute(const char *lhs, const char *rhs){
    if(strlen(lhs)!=strlen(rhs)) return -1;
    int hamCount = 0;
    int length = strlen(rhs);
	printf("%i\n", length);
    for(int i = 0; i < length+1; i++){
        if(lhs[i]!=rhs[i]) hamCount+=1;
		printf("%c, %c, count = %i\n", lhs[i], rhs[i], hamCount);
    }
return hamCount;
}
int main() {
   
printf("%i", compute("T", "T"));


}