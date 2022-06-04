import { useState, useEffect } from "react";
import SupervisorChatComp from "./SupevisorChatComp";

function SuperviserChatTab() {
	const [data, setdata] = useState([]);

	useEffect(() => {
		const _data = [
			{
				id: "1",
				avatar: "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
				grp_name: "Robert Wolfkisser",
				sent_message: "Engineer",
				rec_message: "rob_wolf@gmail.com",
			},
			{
				id: "2",
				avatar: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
				grp_name: "Jill Jailbreaker",
				sent_message: "Engineer",
				rec_message: "jj@breaker.com",
			},
			{
				id: "3",
				avatar: "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
				grp_name: "Henry Silkeater",
				sent_message: "Designer",
				rec_message: "henry@silkeater.io",
			},
			{
				id: "4",
				avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
				grp_name: "Bill Horsefighter",
				sent_message: "Designer",
				rec_message: "bhorsefighter@gmail.com",
			},
			{
				id: "5",
				avatar: "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
				grp_name: "Jeremy Footviewer",
				sent_message: "Manager",
				rec_message: "jeremy@foot.dev",
			},
		];
		setdata(_data);
	}, []);
	const chats = data.map((item, index) => {
		return (
			<div key={index} style={{ maxWidth: "500px", margin: "auto" }}>
				<SupervisorChatComp
					grp_name={item.grp_name}
					rec_message={item.rec_message}
					sent_message={item.sent_message}
				></SupervisorChatComp>
				<br></br>
			</div>
		);
	});
	return <div>{chats}</div>;
}

export default SuperviserChatTab;
