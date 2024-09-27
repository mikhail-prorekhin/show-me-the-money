
import { IconButtonProps, IconButton, styled } from "@mui/material";

interface ExpandBlockProps extends IconButtonProps {
    expand: boolean;
}

const ExpandBlock = styled((props: ExpandBlockProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

export default ExpandBlock