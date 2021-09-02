import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

const Likes = ({whoLikedArray, currentUser }) => {

    if(whoLikedArray.length>0){
        return whoLikedArray.find((whoLikedID) => (whoLikedID === currentUser?.profile?._id))
        ? (<><ThumbUpAltIcon fontSize="small" /> { whoLikedArray.length >=2 ? `You & ${whoLikedArray.length-1} Others` : `You Like`} </>)
        : (<><ThumbUpAltIcon fontSize="small" /> { whoLikedArray.length >=2 ? `${whoLikedArray.length} Likes`: `${whoLikedArray.length} Like` }</>)
    }
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
}

export default Likes
