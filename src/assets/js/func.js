import { useRouter } from 'vue-router';
const router = useRouter;
var func = {
    changePage: ((destination) => {
        router.push({
            name: destination
        });
    })
};

export default func;