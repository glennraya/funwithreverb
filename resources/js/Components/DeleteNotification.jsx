import { useForm } from '@inertiajs/react'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import ThumbsUp from './ThumbsUp'

const DeleteNotification = ({ editor, entity, closeNotif }) => {
    const { delete: destroy } = useForm({ id: entity.article.id })
    const [timeoutId, setTimeoutId] = useState(null)
    const duration = 6000

    useEffect(() => {
        // Clear any existing timeout
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        // Start a new timeout
        const newTimeoutId = setTimeout(() => {
            closeNotif(entity.article)
        }, duration)

        setTimeoutId(newTimeoutId)

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [])

    // Handle the delete approval request.
    const handleApproveDelete = () => {
        destroy(route('article.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeNotif(entity.article)
        })
    }

    // Stop the timer on mouse enter
    const handleMouseEnter = () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
    }

    // Restart the timer after mouse leave
    const handleMouseLeave = () => {
        const newTimeoutId = setTimeout(() => {
            closeNotif(entity)
        }, duration)

        setTimeoutId(newTimeoutId)
    }

    return (
        <Card
            shadow="lg"
            className="w-[430px] border border-cyan-200 px-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <div className="flex flex-col items-start justify-center gap-1">
                        <h4 className="text-default-700 font-semibold leading-none">
                            Someone has requested to delete an article
                        </h4>
                    </div>
                </div>
                <Button
                    className="bg-gray-200 text-black"
                    radius="full"
                    size="sm"
                    isIconOnly
                    aria-label="Close"
                    onClick={() => {
                        closeNotif(entity.article)
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="currentColor"
                        className="h-4 w-4 opacity-30 hover:opacity-50"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </Button>
            </CardHeader>
            <CardBody className="text-default-600 pb-4 text-sm">
                <p>
                    <span className="font-bold">{editor.name}</span> has
                    requsted to delete the article{' '}
                    <span className="font-bold">{entity.article.title}</span>.
                    <Image
                        alt={entity.article.title}
                        className="my-2 h-full w-full rounded-xl object-cover"
                        src={entity.article.article_image}
                        width="full"
                        removeWrapper
                        loading="lazy"
                    />
                    Do you want to allow this?
                </p>
            </CardBody>
            <CardFooter className="justify-end gap-2">
                <Button
                    color="danger"
                    variant="shadow"
                    className="font-bold"
                    onClick={handleApproveDelete}
                >
                    <ThumbsUp />
                    <span>Allow</span>
                </Button>
                <Button color="default" variant="ghost">
                    <span>Reject</span>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default DeleteNotification
