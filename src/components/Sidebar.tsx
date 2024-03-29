import { Link, useLocation } from "react-router-dom";
import menuItems from "@constants/menu";
import { Layout, Menu, MenuProps } from "antd";
import { createElement, useEffect, useState } from "react";

const { Sider } = Layout;

const Sidebar = () => {
	const currentLocation = useLocation().pathname;
	const [pathId, setPathId] = useState(0);
	const [collapsed, setCollapsed] = useState(false);

	const menu: MenuProps["items"] = menuItems.map((item, index) => {
		return {
			key: index,
			icon: createElement(item.icon),
			label: item.subItems ? (
				item.name
			) : (
				<Link to={item.url}>{item.name}</Link>
			),
			children: item.subItems
				? item.subItems.map((si, i) => {
						return {
							key: (i + 10) * (index + 20) + 10,
							icon: createElement(si.icon),
							label: <Link to={si.url}>{si.name}</Link>,
						};
				  })
				: null,
		};
	});

	useEffect(() => {
		menuItems.forEach((item, index) => {
			item.url === currentLocation ? setPathId(index) : null;
		});
	}, [currentLocation]);

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={(value: boolean) => setCollapsed(value)}
		>
			<div
				style={{
					height: 32,
					margin: 16,
					background: "rgba(255, 255, 255, 0.2)",
				}}
			/>
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={[pathId.toString()]}
				selectedKeys={[pathId.toString()]}
				items={menu}
			/>
		</Sider>
	);
};

export default Sidebar;
