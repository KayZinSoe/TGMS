

interface GreetingProps {
  name: string
  onStart: () => void
}

export default function Greeting({ name, onStart }: GreetingProps) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>Welcome to our app!</p>
      <button onClick={onStart}>Get Started</button>
    </div>
  )
}
