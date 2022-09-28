import PropTypes from "prop-types";
import LeaderLine from 'react-leader-line'; // The default


const DrawLeaderLine = ({ startId, endId }) => {
  var l = new LeaderLine(
    document.getElementById(startId),
    document.getElementById(endId),
    {
      startSocket: "right",
      endSocket: "top",
      color: "teal"
    }
  );


  return l;
};

DrawLeaderLine.defaultProps = {
  options: {
    startSocket: "right",
    endSocket: "top",
    startSocketGravity: 450,
    endSocketGravity: 450
  }
};

DrawLeaderLine.propTypes = {
  startId: PropTypes.string.isRequired,
  endId: PropTypes.string.isRequired,
  options: PropTypes.object,
};

export default DrawLeaderLine;
