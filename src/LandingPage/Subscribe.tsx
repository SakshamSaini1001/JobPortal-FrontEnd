import { Button, TextInput } from "@mantine/core";

const Subscribe = () => {

    return <div className="mt-20 flex items-center justify-around  bg-mine-shaft-900 mx-20 py-3 rounded-xl">
    <div className="text-4xl w-2/5 font-semibold  text-mine-shaft-100 text-center">
      Never Wants To Miss Any <span className="text-bright-sun-400"> <br />Job News ? </span>
    </div>
  
    <div className="flex gap-4 rounded-lg ml-5 bg-mine-shaft-700 px-3 py-2 items-center">
      <TextInput
        className=" [&_input]:text-mine-shaft-100 font-semibold"
        variant="unstyled"
        placeholder="Your@email.com"
        size="xl"
      />
      <Button  className="!rounded-lg" size="lg" color="brightSun.4" variant="filled">Subcribe</Button>
    </div>
  </div>
   
}
export default Subscribe;