#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int main() {
int candidate = 1;
int candidate_cp = candidate;
    
    int digitNum = 1;
    while(candidate_cp/10)
    {
        candidate_cp /= 10;
        digitNum++;
    }
    int candidate_cp_1 = candidate;

    printf("%i\n", candidate_cp_1);
    int dummy = 0;
    for(int i = 0; i<digitNum; i++){
        printf("%i\n", candidate_cp_1%10);
        dummy += pow(candidate_cp_1%10, digitNum);
        candidate_cp_1 /= 10; 
    }
    if(candidate==dummy)
    {
        return 1;
    }
   return 0;
}
 