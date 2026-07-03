struct LevelTracker {
    static var highestUnlockedLevel = 1
    var currentLevel = 1

    static func unlock(_ level: Int) {
        if level > highestUnlockedLevel { highestUnlockedLevel = level }
    }

    mutating func advance(to level: Int) -> Bool {
        if level <= LevelTracker.highestUnlockedLevel {
            currentLevel = level
            return true
        }
        return false
    }
}

class Player {
    var tracker = LevelTracker()
    let playerName: String

    init(name: String) {
        playerName = name
    }

    func complete(level: Int) {
        LevelTracker.unlock(level + 1)
        tracker.advance(to: level + 1)
    }
}

var player = Player(name: "Ada")
player.complete(level: 1)
print(LevelTracker.highestUnlockedLevel)
