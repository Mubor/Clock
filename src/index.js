const beep = () => {
    audio.play();
};

const getTimeoutToNextSecond = () => {
    return 1000 - new Date().getMilliseconds();
};

const getDifferenceOfTimeInMilliseconds = ({hours, minutes, seconds}) => {
    const now = new Date();
    const isNextDay = !(hours > now.getHours() || 
        (hours === now.getHours() && minutes > now.getMinutes()) ||
        (hours === now.getHours() && minutes === now.getMinutes() && seconds > now.getSeconds())
    );
    const alarmDay = now.getDate() + (isNextDay ? 1 : 0);
    let alarmDate = new Date();

    alarmDate.setFullYear(now.getFullYear(), now.getMonth(), alarmDay);
    alarmDate.setHours(hours, minutes, seconds);

    return alarmDate - now;
};

const onSubmit = ((form) => {
    let timeId = null;

    return (form) => {
        if( form.repeat ) {
            if( timeId ) {
                clearInterval(timeId);
            }

            timeId = setInterval(beep, getDifferenceOfTimeInMilliseconds(form));
        } else {
            setTimeout(beep, getDifferenceOfTimeInMilliseconds(form));
        }
        
        dialogWindow.hidden = true;
    }
})(); 

const dialogWindow = document.querySelector('.app-dialog');
const alarmOpenButton = document.getElementById('alarm');
const audio = new Audio('../audio/music.wav');

Former(document.forms.settings, onSubmit);
dialogWindow.hidden = true;

alarmOpenButton.addEventListener('click', e => {
    dialogWindow.hidden = false;
});

setInterval(() => {
    const date = new Date();
    document.querySelector('.time').innerHTML = date.toLocaleTimeString();
}, getTimeoutToNextSecond());