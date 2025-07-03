import ChatHeader from './ChatHeader';
import { BsPlusCircleFill } from 'react-icons/bs';

function Messages({ channelName }: { channelName: string }) {
  return (
    <div
      className="flex flex-col h-full w-full m-0
    bg-gray-300 dark:bg-gray-700 overflow-hidden"
    >
      <ChatHeader channelName={channelName} />
      <div
        className="flex flex-col-reverse w-full h-full 
    mt-0 ml-0"
      >
        <Post
          name="Kent"
          timestamp="2 minutos"
          profilePicture="https://randomuser.me/api/portraits/men/22.jpg"
          text={`¡Hola a todos! 👋 Me llamo Kent y acabo de incorporarme al equipo. Estoy muy entusiasmado por comenzar a trabajar con ustedes. Si hay algo que deba saber o alguien con quien deba coordinar primero, ¡quedo atento!`}
        />
        <Post
          name="Cintia"
          timestamp="3 minutos"
          profilePicture="https://randomuser.me/api/portraits/women/9.jpg"
          text={`Buenas tardes, ¿alguien sabe si ya se definió la fecha límite para entregar la presentación del proyecto? Quiero asegurarme de que estoy alineado con el resto del equipo. Gracias de antemano 😊`}
        />
        <Post
          name="Klenty"
          timestamp="6 minutos"
          profilePicture="https://randomuser.me/api/portraits/women/44.jpg"
          text={`Equipo, les dejo un breve update: ya terminé con la revisión del módulo de autenticación. Si alguien quiere darle un segundo vistazo o probarlo, está todo subido en la rama feature/login-refactor. ¡Feedback bienvenido!`}
        />
        <Post
          name="Kon"
          profilePicture="https://randomuser.me/api/portraits/men/1.jpg"
          timestamp="10 minutos"
          text={`Hola, ¿les parece si nos reunimos 10-15 minutos mañana a la mañana para alinear tareas de la semana? Propongo 10:00 hs, pero puedo adaptarme. Dejen 👍 si pueden o sugieran otro horario.`}
        />
      </div>
      <BottomBar />
    </div>
  );
}

type PostProps = {
  name: string;
  timestamp: string;
  text: string;
  profilePicture?: string;
};

const Post = ({ name, timestamp, text, profilePicture }: PostProps) => {
  return (
    <div className="w-full flex flex-row py-1 my-3 px-8 m-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500 transition-all duration-300 ease-in-out">
      <div className="flex flex-col items-center w-12 m-0 mb-auto">
        <img
          src={profilePicture}
          alt="avatar"
          className="flex-none w-12 h-full mb-auto mt-0 mx-0 object-cover 
    bg-gray-100 rounded-full shadow-md cursor-pointer"
        />
      </div>

      <div className="w-4/5 flex flex-col justify-start ml-10">
        <p className="text-left mr-2 font-semibold text-gray-800 dark:text-white cursor-pointer">
          {name}
          <small className="text-xs text-left font-semibold text-gray-600 dark:text-gray-500 ml-2">
            {timestamp}
          </small>
        </p>
        <p className="text-lg text-left text-gray-800 dark:text-white mr-auto whitespace-normal">
          {text}
        </p>
      </div>
    </div>
  );
};

const BottomBar = () => (
  <div
    className="flex flex-row items-center justify-between right-8 bottom-2 shadow-lg bg-gray-200 dark:bg-gray-600
    px-2 h-16"
  >
    <BsPlusCircleFill
      size="22"
      className="text-green-500 dark:shadow-lg mx-2 dark:text-primary"
    />
    <input
      className="font-semibold w-full ml-0 mr-auto cursor-text
    bg-transparent outline-none text-gray-500  dark:text-gray-400 placeholder-gray-500"
      type="text"
      placeholder="Ingresa un mensaje..."
    />
  </div>
);

export default Messages;
