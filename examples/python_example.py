class Dog:
    kind = "canine"

    def __init__(self, name):
        self.name = name
        self.tricks = []

    def add_trick(self, trick):
        self.tricks.append(trick)


fido = Dog("Fido")
buddy = Dog("Buddy")
max = Dog("Max")

fido.add_trick("roll over")
buddy.add_trick("play dead")
max.add_trick("fetch")

print(fido.name, fido.tricks)
print(buddy.name, buddy.tricks)
print(max.name, max.tricks)
