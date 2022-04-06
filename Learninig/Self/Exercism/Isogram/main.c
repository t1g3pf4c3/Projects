# include "isogram.h"
# include <stdlib.h>
#include <stdio.h>
int main(void)
{
   is_isogram("NULL"); 
   is_isogram(NULL);
   is_isogram("");
   is_isogram(" ");
   is_isogram("lumberjacks");
   is_isogram("background");
   is_isogram("downstream");
   printf("------: ");
   is_isogram("six-year-old");
   is_isogram("AAAAAAAAlphabet");
   is_isogram("lol");
   printf("multiple: ");
   is_isogram("zzyx");
   is_isogram("alphabet");

}