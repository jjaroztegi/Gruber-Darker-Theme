enum WebEvent {
    PageLoad,
    PageUnload,
    KeyPress(char),
    Paste(String),
    Click { x: i64, y: i64 },
}

fn inspect(event: WebEvent) {
    match event {
        WebEvent::PageLoad => println!("page loaded"),
        WebEvent::PageUnload => println!("page unloaded"),
        WebEvent::KeyPress(c) => println!("pressed '{c}'"),
        WebEvent::Paste(text) => println!("pasted \"{text}\""),
        WebEvent::Click { x, y } => println!("clicked at x={x}, y={y}"),
    }
}

fn main() {
    inspect(WebEvent::PageLoad);
    inspect(WebEvent::KeyPress('x'));
    inspect(WebEvent::Paste("hello".into()));
    inspect(WebEvent::Click { x: 20, y: 80 });
    inspect(WebEvent::PageUnload);
}
