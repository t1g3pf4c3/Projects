#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>

unsigned int sum_of_squares(unsigned int number){
	unsigned int sqNum = (number*(number+1)*(2*number+1))/6;
	return sqNum;
}

unsigned int square_of_sum(unsigned int number){
	unsigned int numSq = number*(number+1)/2;
	numSq=numSq*numSq;
	return numSq;
}
unsigned int difference_of_squares(unsigned int number){
	unsigned int diff = square_of_sum(number)-sum_of_squares(number);
	return diff;
}

int main()
{
	uint16_t d = 1;
	d=d<<15;
	printf("%u\n", d);
	return 0; 
}