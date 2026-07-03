#include <stdio.h>
#include <stdlib.h>

int main(void) {
    FILE *fp = fopen("example.txt", "w+");
    if (!fp) {
        perror("fopen");
        return EXIT_FAILURE;
    }

    fputs("alpha\nbeta\ngamma\n", fp);
    rewind(fp);

    char buffer[16];
    while (fgets(buffer, sizeof buffer, fp)) {
        printf("%s", buffer);
    }

    if (ferror(fp)) {
        puts("I/O error while reading the file.");
        fclose(fp);
        return EXIT_FAILURE;
    }

    fclose(fp);
    return EXIT_SUCCESS;
}
