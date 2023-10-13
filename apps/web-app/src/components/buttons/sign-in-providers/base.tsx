import Image from 'next/image';
import { ProviderButtonContainer } from './styles';

export interface IProviderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    iconSrc: string;
    provider: string;
    label: string;
}
export const ProviderSignInButton = ({ iconSrc, provider, label, onClick, ...rest }: IProviderButtonProps) => {
    return (
        <ProviderButtonContainer onClick={onClick}>
            <Image width={80} height={25} src={iconSrc} alt={provider}/>
            <span>{label}</span>
        </ProviderButtonContainer>
    );    
}