import DeleteIcon from '@/Components/DeleteIcon'
import Notification from '@/Components/Notification'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import {
    Card,
    CardHeader,
    CardBody,
    Image,
    Link,
    CardFooter,
    Button
} from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

export default function Dashboard({ auth, articles }) {
    const [articleList, setArticleList] = useState(articles)
    const [notifications, setNotifications] = useState([])

    const notifAnimation = {
        hidden: { opacity: 0, x: '100%' },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: '100%' }
    }

    const notifCardAnimation = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    }

    const handleDelete = article => {
        router.post(
            'delete-article-request/',
            {
                id: article.id,
                user_id: auth.user.id
            },
            {
                preserveScroll: true
            }
        )

        setNotifications(prevNotifs => [...prevNotifs, article])
    }

    // Handle the simple pagination navigation.
    const handlePageChange = url => {
        if (url) {
            router.get(url)
        }
    }

    const handleCloseNotif = article => {
        setNotifications(prevNotifs =>
            prevNotifs.filter(notif => notif.id !== article.id)
        )
    }

    const handleRemoveArticle = id => {
        setArticleList(prevArticleList => ({
            ...prevArticleList,
            data: prevArticleList.data.filter(item => item.id !== id)
        }))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-black uppercase leading-tight text-gray-800">
                    {auth.user.role === 'chief-editor'
                        ? 'The Glorified Chief 🤴🏼'
                        : 'The Guy Who Do Most of the Work 😩'}
                </h2>
            }
            removeArticle={handleRemoveArticle}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <ul className="fixed right-6 top-6 z-20 flex flex-col gap-2">
                    <AnimatePresence>
                        {notifications.map(article => (
                            <motion.li
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={notifAnimation}
                                transition={{ duration: 0.5 }}
                                key={article.id}
                            >
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={notifAnimation}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Notification
                                        article={article}
                                        closeNotif={() =>
                                            handleCloseNotif(article)
                                        }
                                    />
                                </motion.div>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {auth.user.role === 'editor' && (
                        <>
                            <div className="grid grid-cols-1 gap-6 overflow-hidden bg-white p-8 shadow-sm sm:rounded-lg md:grid-cols-2 lg:grid-cols-4">
                                <AnimatePresence>
                                    {articleList.data.map(article => (
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            variants={notifCardAnimation}
                                            transition={{ duration: 0.5 }}
                                            key={article.id}
                                        >
                                            <Card
                                                className="py-1"
                                                shadow="md"
                                                key={article.id}
                                            >
                                                <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
                                                    <p className="text-tiny font-bold uppercase">
                                                        Nature Blog
                                                    </p>
                                                    <small className="text-default-500">
                                                        {article.created_at}
                                                    </small>
                                                    <h4 className="text-large font-bold">
                                                        <Link
                                                            href="#"
                                                            color="foreground"
                                                            className="hover:text-blue-500"
                                                        >
                                                            {article.title}
                                                        </Link>
                                                    </h4>
                                                </CardHeader>
                                                <CardBody className="w-full overflow-visible py-2">
                                                    <Image
                                                        isBlurred
                                                        alt="Card background"
                                                        className="h-full w-full rounded-xl object-cover"
                                                        src={
                                                            article.article_image
                                                        }
                                                        width={'full'}
                                                        removeWrapper
                                                        shadow="md"
                                                        loading="lazy"
                                                    />
                                                </CardBody>
                                                <CardFooter className="justify-end gap-2">
                                                    <Button
                                                        variant="faded"
                                                        color="default"
                                                        className="text-sm font-bold uppercase"
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        isIconOnly
                                                        variant="faded"
                                                        color="danger"
                                                        onClick={event =>
                                                            handleDelete(
                                                                article
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Pagination URL Links */}
                            <div className="mt-2 flex justify-center gap-2">
                                <Button
                                    className="bg-white font-medium text-black"
                                    size="lg"
                                    variant="faded"
                                    color="primary"
                                    isDisabled={!articles.prev_page_url}
                                    onPress={() =>
                                        handlePageChange(articles.prev_page_url)
                                    }
                                >
                                    Previous
                                </Button>
                                <Button
                                    className="bg-white font-medium text-black"
                                    size="lg"
                                    variant="faded"
                                    color="primary"
                                    isDisabled={!articles.next_page_url}
                                    onPress={() =>
                                        handlePageChange(articles.next_page_url)
                                    }
                                >
                                    Next
                                </Button>
                            </div>
                        </>
                    )}

                    {auth.user.role === 'chief-editor' && (
                        <div className="bg-white p-8 shadow-sm sm:rounded-lg">
                            <h4 className="text-2xl font-bold">
                                I am the Chief Editor
                            </h4>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
