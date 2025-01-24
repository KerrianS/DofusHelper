import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ButtonComponent from '../Button/ButtonComponent';

function CardComponent({ title, img, gameSlug, className }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${gameSlug}`);
    };

    return (
        <div className={className} onClick={handleClick}>
            <div className="card-content">
                <div className="icon-wrapper">
                    {img}
                </div>
                <ButtonComponent
                    text={title}
                    color="white"
                    textColor="var(--main-purple)"
                    borderRadius="10px"
                    endIcon={<ArrowForwardIosRoundedIcon fontSize='small' />}
                    fontWeight={600}
                />
            </div>
        </div>
    );
}

export default CardComponent;