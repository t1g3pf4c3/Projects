#include "isogram.h"
#include <string.h>
#include <stdio.h>
#include <ctype.h>
bool is_isogram(const char phrase[])
{
	if(phrase==NULL) return 0;
	
	int len = strlen(phrase);
	
	if (len<2) return 0;
	
	char cpyPhrase[strlen(phrase)+1];
	
	for (int i = 0; i<len; i++)
	{
		cpyPhrase[i] = toupper(phrase[i]);
		// printf("%c",cpyPhrase[i]);
	}

	for (int i = 0; i< len; i++)
	{
		for (int j = 0; j< len; j++)
		{
			// printf("%c, %i ", cpyPhrase[i], i);
			// printf("%c, %i \n", cpyPhrase[j], j);
			// printf("%i \n", strcmp(&cpyPhrase[i], &cpyPhrase[j]));
			
				if( i!=j && cpyPhrase[i]!=*"-" && cpyPhrase[i]==cpyPhrase[j])
				{
					return 0;
				}
			
			
		}
	}

	printf("worked! \n");
	return 1;
}