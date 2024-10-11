import { FC } from "react";

interface ErrorProps {
    message: string;
}

const Error: FC<ErrorProps> = ({ message }: ErrorProps) => (
    <div>
        <span>{ message }</span>
    </div>
)

export default Error;
