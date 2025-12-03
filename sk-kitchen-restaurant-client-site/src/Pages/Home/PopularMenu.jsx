import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import MenuItem from '../Shared/MenuItem/MenuItem';
import useMenu from '../../Hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item=>item.category === "popular")
    // const[menu, setMenu]= useState([])
    // useEffect(()=>{
    //     fetch('menu.json')
    //     .then(res=> res.json())
    //     .then(data=>{
    //         const popularItems = data.filter(item=> item.category === "popular")
    //         setMenu(popularItems)
    //         // console.log(popularItems)
    //     })
    // },[])
    return (
        <section className='my-16'>
            <SectionTitle
              subHeading="Check it out"
            heading="FROM OUR MENU"
            ></SectionTitle>

            <div className='grid md:grid-cols-2 gap-5'>
                {
                    popular.map(item=> <MenuItem key={item._id} menu_item={item}></MenuItem>)
                }
            </div>

            <div className='flex justify-center '>
               <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
            </div>

            <div className='md:6-5xl mx-auto bg-black my-16'>
                <h1 className='text-white text-center p-16 text-4xl'>Call Us: +88 0192345678910</h1>
            </div>
        </section>
    );
};

export default PopularMenu;