module.exports = {
  format_time: (date) => {
    //console.log ("date" + date)
    let dateObj = new Date(parseInt (date));
    
    return `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
  },

};
