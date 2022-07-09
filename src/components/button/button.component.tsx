// import "./button.styles.scss";

// export const BUTTON_TYPE_CLASSES = {
// 	google: "google-sign-in",
// 	inverted: "inverted",
// };

// const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
// 	return (
// 		<button
// 			className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
// 			disabled={isLoading}
// 			{...otherProps}
// 		>
// 			{children}
// 		</button>
// 	);
// };

// export default Button;

//For TS
import { ButtonHTMLAttributes, FC } from "react";
import "./button.styles.scss";

export enum BUTTON_TYPE_CLASSES {
	base = "base",
	google = "google-sign-in",
	inverted = "inverted",
}

export type ButtonProps = {
	buttonType?: BUTTON_TYPE_CLASSES;
	isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
	children,
	buttonType,
	isLoading,
	...otherProps
}) => {
	return (
		<button
			className={`button-container ${buttonType}`}
			disabled={isLoading}
			{...otherProps}
		>
			{children}
		</button>
	);
};

export default Button;
