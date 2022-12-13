import moment from "jalali-moment";

export const solarDate = () => {
  new Date().toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit" });
};


export const solarDateFarsi = () => {
  new Date().toLocaleDateString("fa-IR", { year: "numeric", month: "2-digit", day: "2-digit" });
};

export const lunarDate = () => {
  new Date().toLocaleDateString("en", { year: "numeric" }) / new Date().toLocaleDateString("en", { month: "2-digit" }) / new Date().toLocaleDateString("en", { day: "2-digit" });
};

export const localTime = () => {
  new Date().toString().substring(16, 21);
};

export const lunarSignUpDate = ({ isLoggedIn }) => {
  return isLoggedIn.createdAt.substring(0, 10).replaceAll("-", "/");
};

export const solarSignUpDate = ({ isLoggedIn }) => {
  return moment(isLoggedIn.createdAt.substring(0, 10).replaceAll("-", "/")).locale("fa").format("YYYY/MM/DD");
};

export const localSignUpTime = ({ isLoggedIn }) => {

    function parseMillisecondsIntoReadableTime(milliseconds){
        //Get hours from milliseconds
        var hours = milliseconds / (1000*60*60);
        var absoluteHours = Math.floor(hours);
        var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
      
        //Get remainder from hours and convert to minutes
        var minutes = (hours - absoluteHours) * 60;
        var absoluteMinutes = Math.floor(minutes);
        var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

        return h + ':' + m ;
      }

  return parseMillisecondsIntoReadableTime(Number(isLoggedIn.createdAt.substring(11, 13) * 60 * 60 * 1000) + Number(isLoggedIn.createdAt.substring(14, 16) * 60 * 1000) - Number(new Date().getTimezoneOffset() * 60 * 1000));
};
