import { InputHTMLAttributes, FC } from "react";
import "../form-input/form-input.styles.scss";

type FormInputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

const FormInputs: FC<FormInputProps> = ({ label, ...otherProps }) => {
	return (
		<div className="group">
			<input className="form-input" {...otherProps} />
			{label && (
				<label
					className={`${
						Boolean(
							otherProps.value &&
								typeof otherProps.value === "string" &&
								otherProps.value.length
						)
							? "shrink"
							: " "
					} form-input-label`}
				>
					{label}
				</label>
			)}
		</div>
	);
};

export default FormInputs;
