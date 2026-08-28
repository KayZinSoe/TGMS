# React TypeScript Guidelines


Stack:

React
TypeScript
Vite
React Router


Rules:

Use functional components.

Prefer:

interface Props {}

Avoid:

any


Example:

interface UserCardProps {
 user: User;
}


export function UserCard({
 user
}: UserCardProps){

}