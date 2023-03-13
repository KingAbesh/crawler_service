// import config from "@config";
import { executeCrawling } from "@helpers/executecrawling";

const daemon = async () => {
  try {
    // run jobs async  
	executeCrawling()	
  } catch (err) {
    console.log(err);
  } finally {
    setTimeout(() => daemon(), 1000000);
  }
};

export const scraperDaemon = daemon;
