objects = main.o kbd.o command.o display.o \
	insert.o search.o files.o utils.o
cc = cc
cflags = -O2 -g

edit: $(objects)
	$(cc) $(cflags) -o edit $(objects)

main.o: main.c defs.h
	$(cc) $(cflags) -c main.c

kbd.o: kbd.c defs.h command.h
	$(cc) $(cflags) -c kbd.c

command.o: command.c defs.h command.h
	$(cc) $(cflags) -c command.c

clean:
	rm -f edit $(objects)

.PHONY: clean
